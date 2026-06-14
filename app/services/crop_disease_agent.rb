class CropDiseaseAgent
  def self.diagnose(scan)
    user = scan.user
    profile = user.profile

    chat = Chat.create!(
      model: "gemini-2.5-flash-lite",
      provider: :gemini,
      assume_model_exists: true
    )

    prompt = <<~PROMPT
      Analyze this image of a #{profile&.crops || 'crop'}.#{' '}
      The user's farm details:
      - Land Size: #{profile&.land_size || 'N/A'} acres
      - Soil Type: #{profile&.soil_type || 'N/A'}
      - Location: #{profile&.location || 'N/A'}

      The local client-side model detected:
      - Suspected Disease: #{scan.disease_name}
      - Confidence Score: #{scan.confidence_score}
      NOTE that the above model detection is edge-based, so it may predict wrong. If the outputs doesn't
      match, ignore the above details. DO NOT specify anything about it in the output. You can use your
      own inference there.

      Please verify this diagnosis, provide a final assessment, and suggest remedies.
      Provide:
      1. Verified Disease Name
      2. Final Confidence Score (0.0 to 1.0)
      3. Detailed Remedies
    PROMPT

    file_path = ActiveStorage::Blob.service.path_for(scan.image.key)

    response = chat.ask prompt, with: file_path

    content = response.content

    disease_match = content.match(/Verified Disease Name:\s*(.+)/i)
    confidence_match = content.match(/Final Confidence Score:\s*([\d.]+)/i)

    disease_name = disease_match ? disease_match[1].gsub(/^\*+|\*+$/, "").strip : "Unknown"
    confidence_score = confidence_match ? confidence_match[1].to_f : 0.0
    scan.update!(
      remedies: content,
      disease_name: disease_name,
      confidence_score: confidence_score == 0.0 ? scan.confidence_score : confidence_score
    )
  end
end
