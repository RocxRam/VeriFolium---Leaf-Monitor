class ScansController < InertiaController
  def new
    render inertia: "Scans/New"
  end

  def show
    @scan = Current.user.scans.find(params[:id])
    render inertia: "Scans/Show", props: { scan: @scan }
  end

  def create
    @scan = Current.user.scans.new(scan_params)
    if @scan.save
      CropDiseaseAgent.diagnose(@scan)
      redirect_to scan_path(@scan), notice: "Diagnosis complete."
    else
      redirect_to new_scan_path, alert: "Scan failed: #{@scan.errors.full_messages.join(', ')}"
    end
  end

  private

  def scan_params
    params.permit(:image, :disease_name, :confidence_score)
  end
end
