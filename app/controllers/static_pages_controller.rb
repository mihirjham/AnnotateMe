class StaticPagesController < ApplicationController
  def root
    render :root
  end

  def letsencrypt
    render text: "01xxZQ99kJvNtW-S5CgpHdeUHcXDPSDjZxjWbW23W6A.OrJWVXZcYRTVZjoEhL0dmTdMu7cgkomNso-Zk9fUpUg"
  end
end
