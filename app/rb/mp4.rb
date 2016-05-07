# Unofficial documentation on MP4 tag keys:
# 	http://mutagen.readthedocs.org/en/latest/api/mp4.html
# 	http://www.rubydoc.info/github/robinst/taglib-ruby/TagLib/MP4/File

module MP4
	extend self

	ITEM_NAME_MAP = {
		aART: 'Artist',
		disk: 'Disc',
		trkn: 'Track',
		©ART: 'Album Artist',
		©alb: 'Album',
		©gen: 'Genre',
		©nam: 'Title',
		©wrt: 'Composer',
		©day: 'Year',
	}

	VALUE_TYPES = {
		STRING: 'string',
		INT: 'int',
		YEAR: 'year'
	}

	ITEM_TYPE_MAP = {
		aART: VALUE_TYPES[:STRING],
		disk: VALUE_TYPES[:INT],
		trkn: VALUE_TYPES[:INT],
		©ART: VALUE_TYPES[:STRING],
		©alb: VALUE_TYPES[:STRING],
		©cmt: VALUE_TYPES[:STRING],
		©gen: VALUE_TYPES[:STRING],
		©nam: VALUE_TYPES[:STRING],
		©wrt: VALUE_TYPES[:STRING],
		©day: VALUE_TYPES[:YEAR],
	}

	READ_PREFIX = 'read_'
	WRITE_PREFIX = 'write_'

	def read_tags(filepath)
		tag_data = {}

		TagLib::MP4::File.open(filepath) do |file|
			for item in file.tag.item_list_map.to_a
				item_key = item[0]
				item_key_string = item_key.intern
				tag_name = ITEM_NAME_MAP[item_key_string]
				next if !tag_name

				read_function_name = READ_PREFIX + ITEM_TYPE_MAP[item_key_string]
				val = send(read_function_name, item[1])
				tag_data[tag_name] = val
			end
		end

		tag_data
	end

	def write_tags(song)
		TagLib::MP4::File.open(song['filepath']) do |file|
			desired_keys = [:aART, :disk, :trkn, :©ART, :©alb, :©gen, :©nam, :©wrt, :©day]
			item_list = file.tag.item_list_map
	
			for key in desired_keys
				tag_name = ITEM_NAME_MAP[key]
				puts tag_name
				data_type = ITEM_TYPE_MAP[key]
				write_function_name = WRITE_PREFIX + data_type
				edited_item = send(write_function_name, song[tag_name], item_list[key.to_s])
				item_list.insert(key.to_s, edited_item)
			end

			for item in item_list.to_a
				item_key = item[0]
				item_key_string = item_key.intern
				tag_name = ITEM_NAME_MAP[item_key_string]
				next if !tag_name

				read_function_name = READ_PREFIX + ITEM_TYPE_MAP[item_key_string]
				val = send(read_function_name, item[1])
				puts val
			end

			file.save()
		end
	end

	private

	def read_string(item)
		return item != nil ? item.to_string_list[0] : ''
	end

	def read_int(item)
		return item.to_int
	end

	def read_year(item)
		return read_string(item)[0..4]
	end

	def write_year(val, original_item)
		return write_string(val, read_string(original_item))
	end

	# Since this method is called dynamically, we ignore the original_val argument
	def write_string(val, *ignored)
		return TagLib::MP4::Item.from_string_list([val.to_s])
	end

	def write_int(val, original_item)
		# Not allowing editing of total # of tracks/discs, so that value must be passed
		# from the original tag to include in the new value. Must pass 0 if it doesn't exist.
		total_tracks_or_discs = original_item ? original_item.to_int_pair()[1] : 0
		TagLib::MP4::Item.from_int_pair([val.to_i, total_tracks_or_discs])
	end

end