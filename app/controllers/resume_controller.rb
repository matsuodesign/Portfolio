class ResumeController < ApplicationController
	layout 'application'

  def index
   @positivity = ["Happiness often sneaks in through a door you didn't know you left open.",
     "Happiness is when what you think, what you say, and what you do are in harmony.",
     "True happiness comes from the joy of deeds well done, the zest of creating things new.",
     "Be kind whenever possible. It is always possible.",
     "Always do your best. What you plant now, you will harvest later.",
     "The key is to keep company only with people who uplift you, \nwhose presence calls forth your best.",
     "A smile is a curve that sets everything straight.",
     "A warm smile is the universal language of kindness.",
     "A smile is happiness you'll find right under your nose.",
     "Do not go where the path may lead, go instead where there is no path and leave a trail.",
     "For beautiful eyes, look for the good in others; \nfor beautiful lips, speak only words of kindness; \nand for poise, walk with the knowledge that you are never alone.",
     "How far that little candle throws his beams! So shines a good deed in a weary world.",
     "Success is not final, failure is not fatal: it is the courage to continue that counts.", 
     "Coming together is a beginning; keeping together is progress; working together is success.",
     "Optimism is the faith that leads to achievement. Nothing can be done without hope and confidence."]
   @page_title = "UX & Interaction Design"
  	render 'composers/index'
  end

end
