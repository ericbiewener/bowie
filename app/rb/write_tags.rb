#!/Users/ericbiewener/.rvm/rubies/ruby-2.3.0/bin/ruby

require 'taglib'
require 'json'

require_relative '_constants'
require_relative 'mp4'
require_relative 'mp3'

songs = JSON.parse(ARGV[0])

for song in songs
	extension = song['filepath'].split('.')[-1]
	mod = FILE_EXTENSION_MODULE_MAP[extension.intern]
	mod.write_tags(song)
end

puts true

exit