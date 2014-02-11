class ResumeController < ApplicationController
	layout 'application'

  def index
   @body_class = "home"
   @page_title = "UX & Interaction Design"
  	render 'composers/index'
  end

end