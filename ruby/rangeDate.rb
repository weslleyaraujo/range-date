class	RANGE_DATE
	def date_to_unix(time)
	  Time.parse(time).to_i
	end
	 
	def in_progress(start_time, end_time, time_now = (Time.new.strftime '%d/%m/%Y'))
	  now = date_to_unix(time_now)
	  if date_to_unix(start_time) <= now
	    date_to_unix(end_time) < now ? false : true
	  else
	    false
	  end
	end
end