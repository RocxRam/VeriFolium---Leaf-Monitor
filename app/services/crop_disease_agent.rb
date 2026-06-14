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

      Please identify if there is any disease present.
      Provide:
      1. Disease Name (if any)
      2. Confidence Score (0.0 to 1.0)
      3. Possible Remedies
    PROMPT


    file_path = ActiveStorage::Blob.service.path_for(scan.image.key)

    response = chat.ask prompt, with: file_path

    scan.update!(
      remedies: response.content,
      disease_name: "Detected by AI"
    )
  end
end
