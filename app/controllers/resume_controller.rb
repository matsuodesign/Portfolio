class ResumeController < ApplicationController
	layout 'application'

  def index
   @page_title = "UX & Interaction Design"
  	render 'composers/index'
  end

end
