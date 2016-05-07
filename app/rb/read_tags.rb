#!/Users/ericbiewener/.rvm/rubies/ruby-2.3.0/bin/ruby

require 'taglib'
require 'json'

require_relative '_constants'
require_relative 'mp4'
require_relative 'mp3'

data = []

for filepath in ARGV
	extension = filepath.split('.')[-1]
	mod = FILE_EXTENSION_MODULE_MAP[extension.intern]
	tag_data = mod.read_tags(filepath)
	tag_data[:filepath] = filepath

	for key in ['Track', 'Disc']
		tag_data[key] = tag_data[key].to_s.split('/')[0] if tag_data[key]
		tag_data[key] = '' if tag_data[key].to_i == 0
	end

	data.push(tag_data)
end

puts data.to_json

exit