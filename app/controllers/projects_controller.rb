class ProjectsController < ApplicationController
 layout 'application'

 def ask
  @body_class = "ask"
  @page_title = "Ask.com"
  render 'composers/ask'
 end

 def intervention   
  @body_class = "intervention"
  @page_title = "Party Promotion"
  render 'composers/intervention'
 end

 def lminspired   
  @body_class = "lminspired"
  @page_title = "Lminspired"
  render 'composers/lminspired'
 end

 def big_bold   
  @body_class = "big-bold"
  @page_title = "Big Bold Labs"
  render 'composers/big-bold'
 end

 def lapsity   
  @body_class = "lapsity"
  @page_title = "Lapsity App Concept"
  render 'composers/lapsity'
 end

 def fine_art   
  @body_class = "fine-art"
  @page_title = "Fine Art Collection"
  render 'composers/fine-art'
 end
end
