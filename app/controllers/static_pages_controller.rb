class StaticPagesController < ApplicationController
  def root
    render :root
  end

  def letsencrypt
    render text: "NAofb_P5O0vvxg4nUvvTd9u4j2sJaVVGIy9D2UsLiiE.OrJWVXZcYRTVZjoEhL0dmTdMu7cgkomNso-Zk9fUpUg"
  end
end
