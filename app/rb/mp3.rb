module MP3
	extend self

	FRAME_MAP = {
		TALB: 'Album',
		TPE2: 'Album Artist',
		TSOC: 'Composer',
		TCON: 'Genre',
		TIT2: 'Title',
		TRCK: 'Track',
		TDRC: 'Year',
		TPE1: 'Artist',
		TPOS: 'Disc',
		# APIC: 'cover art file',
	}

	

	# File.tag method automatically merges v1 & v2 to provide these frame values.
	# we can therefore ignore them when looping over the frames while reading.
	IGNORE_FRAMES = [:TALB, :TPE1, :TCON, :TIT2, :TRCK, :TDRC]

	def read_tags(filepath)
		tag_data = nil

		TagLib::MPEG::File.open(filepath) do |file|
			tag_data = tag_to_hash(file.tag)

			for frame in file.id3v2_tag.frame_list
				next if IGNORE_FRAMES.include? frame.frame_id
				tag_name = FRAME_MAP[frame.frame_id.intern]
				next if !tag_name
				tag_data[tag_name] = frame.to_string
			end
		end

		tag_data
	end


	def write_tags(song)
		TagLib::MPEG::File.open(song['filepath']) do |file|
			unused_keys = ['TALB', 'TPE2', 'TSOC', 'TCON', 'TIT2', 'TRCK', 'TDRC', 'TPE1', 'TPOS']

			# Wipe out id3v1 tags
			v1_tag = file.id3v1_tag
			v1_tag.album = nil
			v1_tag.artist = nil
			v1_tag.title = nil
			v1_tag.track = 0
			v1_tag.year = 0

			tag = file.id3v2_tag

			# Process frames that the tag currently has
			for frame in tag.frame_list
				tag_name = FRAME_MAP[frame.frame_id.intern]
				next if !tag_name

				unused_keys.delete_at(unused_keys.index(frame.frame_id))

				val = song[tag_name]
				val = val.join('/') if val.kind_of?(Array) # track/disc
				frame.text = val.to_s
			end

			# Process new frames
			for frame_id in unused_keys
				tag_name = FRAME_MAP[frame_id.intern]
				next if !song.key?(tag_name)
				
				new_frame = TagLib::ID3v2::TextIdentificationFrame.new(frame_id, TagLib::String::UTF8)
				new_frame.text = song[tag_name].to_s
				tag.add_frame(new_frame)
			end

			file.save()
		end
	end


	private

	def tag_to_hash(tag)
		{
			Album: tag.album,
			Artist: tag.artist,
			Genre: tag.genre,
			Title: tag.title,
			Track: tag.track,
			Year: tag.year,
		}
	end

end