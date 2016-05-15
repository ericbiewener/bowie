const init = [
	{
		"type": "REPLACE_SONGS",
		"timing": 0,
		"songs": [
			{
				"Artist": "",
				"Disc": "",
				"Track": "",
				"Album Artist": "",
				"Album": "",
				"Year": "",
				"Genre": "",
				"Title": "01 Watch that Man.m4a",
				"Composer": "",
				"filepath": "/Users/hotness/music/tutorial/tracks/David Bowie/1973 Aladdin Sane/01 Watch that Man.m4a"
			},
			{
				"Artist": "",
				"Disc": "",
				"Track": "",
				"Album Artist": "",
				"Album": "",
				"Year": "",
				"Genre": "",
				"Title": "02 Aladdin Sane.m4a",
				"Composer": "",
				"filepath": "/Users/hotness/music/tutorial/tracks/David Bowie/1973 Aladdin Sane/02 Aladdin Sane.m4a"
			},
			{
				"Artist": "",
				"Disc": "",
				"Track": "",
				"Album Artist": "",
				"Album": "",
				"Year": "",
				"Genre": "",
				"Title": "03 Drive-In Saturday.m4a",
				"Composer": "",
				"filepath": "/Users/hotness/music/tutorial/tracks/David Bowie/1973 Aladdin Sane/03 Drive-In Saturday.m4a"
			},
			{
				"Artist": "",
				"Disc": "",
				"Track": "",
				"Album Artist": "",
				"Album": "",
				"Year": "",
				"Genre": "",
				"Title": "04 Panic in Detroit.m4a",
				"Composer": "",
				"filepath": "/Users/hotness/music/tutorial/tracks/David Bowie/1973 Aladdin Sane/04 Panic in Detroit.m4a"
			},
			{
				"Artist": "",
				"Disc": "",
				"Track": "",
				"Album Artist": "",
				"Album": "",
				"Year": "",
				"Genre": "",
				"Title": "05 Cracked Actor.m4a",
				"Composer": "",
				"filepath": "/Users/hotness/music/tutorial/tracks/David Bowie/1973 Aladdin Sane/05 Cracked Actor.m4a"
			},
			{
				"Artist": "",
				"Disc": "",
				"Track": "",
				"Album Artist": "",
				"Album": "",
				"Year": "",
				"Genre": "",
				"Title": "06 Time.m4a",
				"Composer": "",
				"filepath": "/Users/hotness/music/tutorial/tracks/David Bowie/1973 Aladdin Sane/06 Time.m4a"
			},
			{
				"Artist": "",
				"Disc": "",
				"Track": "",
				"Album Artist": "",
				"Album": "",
				"Year": "",
				"Genre": "",
				"Title": "07 The Prettiest Star.m4a",
				"Composer": "",
				"filepath": "/Users/hotness/music/tutorial/tracks/David Bowie/1973 Aladdin Sane/07 The Prettiest Star.m4a"
			},
			{
				"Artist": "",
				"Disc": "",
				"Track": "",
				"Album Artist": "",
				"Album": "",
				"Year": "",
				"Genre": "",
				"Title": "08 Let's Spend the Night Together.m4a",
				"Composer": "",
				"filepath": "/Users/hotness/music/tutorial/tracks/David Bowie/1973 Aladdin Sane/08 Let's Spend the Night Together.m4a"
			},
			{
				"Artist": "",
				"Disc": "",
				"Track": "",
				"Album Artist": "",
				"Album": "",
				"Year": "",
				"Genre": "",
				"Title": "09 The Jean Genie.m4a",
				"Composer": "",
				"filepath": "/Users/hotness/music/tutorial/tracks/David Bowie/1973 Aladdin Sane/09 The Jean Genie.m4a"
			},
			{
				"Artist": "",
				"Disc": "",
				"Track": "",
				"Album Artist": "",
				"Album": "",
				"Year": "",
				"Genre": "",
				"Title": "10 Lady Grinning Soul.m4a",
				"Composer": "",
				"filepath": "/Users/hotness/music/tutorial/tracks/David Bowie/1973 Aladdin Sane/10 Lady Grinning Soul.m4a"
			}
		]
	},
	{
		"type": "CHANGE_NUMBER_OF_DIRECTORIES",
		"timing": 0,
		"change": 2
	},
	{
		"type": "@@redux-undo/CLEAR_HISTORY",
		"timing": 0,
	},
]

const welcome = [
	{
		"type": 'CHANGE_TUTORIAL_TEXT',
		"timing": 0,
		"text": "Welcome! Let's get started with a quick walkthrough.",
	},
]

const main = [
	[
		{
			"type": 'CHANGE_TUTORIAL_TEXT',
			"timing": 0,
			"text": 'You can edit the tags manually by simply clicking in a cell and typing.',
		},
	],
	[
		{
			"type": "HIDE_TUTORIAL_TEXT",
			"timing": 0,
		},
		{
			"type": "VIEW_EDITED_TAGS",
			"timing": 500
		},
		{
			"type": "UPDATE_TAG",
			"timing": 500,
			"songIndex": 0,
			"field": "Title",
			"newVal": "01Watch that Man.m4a",
			"originalVal": "01 Watch that Man.m4a"
		},
		{
			"type": "UPDATE_TAG",
			"timing": 125,
			"songIndex": 0,
			"field": "Title",
			"newVal": "0Watch that Man.m4a",
			"originalVal": "01 Watch that Man.m4a"
		},
		{
			"type": "UPDATE_TAG",
			"timing": 125,
			"songIndex": 0,
			"field": "Title",
			"newVal": "Watch that Man.m4a",
			"originalVal": "01 Watch that Man.m4a"
		},
		{
			"type": "CELL_BLURRED",
			"timing": 0,
		},
		{
			"type": "VIEW_EDITED_TAGS",
			"timing": 0,
		},
		{
			"type": "UPDATE_TAG",
			"timing": 125,
			"songIndex": 0,
			"field": "Album",
			"newVal": "A",
			"originalVal": ""
		},
		{
			"type": "UPDATE_TAG",
			"timing": 125,
			"songIndex": 0,
			"field": "Album",
			"newVal": "Al",
			"originalVal": ""
		},
		{
			"type": "UPDATE_TAG",
			"timing": 125,
			"songIndex": 0,
			"field": "Album",
			"newVal": "Ala",
			"originalVal": ""
		},
		{
			"type": "UPDATE_TAG",
			"timing": 125,
			"songIndex": 0,
			"field": "Album",
			"newVal": "Alad",
			"originalVal": ""
		},
		{
			"type": "UPDATE_TAG",
			"timing": 125,
			"songIndex": 0,
			"field": "Album",
			"newVal": "Aladd",
			"originalVal": ""
		},
		{
			"type": "UPDATE_TAG",
			"timing": 125,
			"songIndex": 0,
			"field": "Album",
			"newVal": "Aladdi",
			"originalVal": ""
		},
		{
			"type": "UPDATE_TAG",
			"timing": 125,
			"songIndex": 0,
			"field": "Album",
			"newVal": "Aladdin",
			"originalVal": ""
		},
		{
			"type": "UPDATE_TAG",
			"timing": 125,
			"songIndex": 0,
			"field": "Album",
			"newVal": "Aladdin ",
			"originalVal": ""
		},
		{
			"type": "UPDATE_TAG",
			"timing": 125,
			"songIndex": 0,
			"field": "Album",
			"newVal": "Aladdin S",
			"originalVal": ""
		},
		{
			"type": "UPDATE_TAG",
			"timing": 125,
			"songIndex": 0,
			"field": "Album",
			"newVal": "Aladdin Sa",
			"originalVal": ""
		},
		{
			"type": "UPDATE_TAG",
			"timing": 125,
			"songIndex": 0,
			"field": "Album",
			"newVal": "Aladdin San",
			"originalVal": ""
		},
		{
			"type": "UPDATE_TAG",
			"timing": 125,
			"songIndex": 0,
			"field": "Album",
			"newVal": "Aladdin Sane",
			"originalVal": ""
		},
		{
			"type": "CELL_BLURRED",
			"timing": 0,
		},
		{
			"type": "VIEW_EDITED_TAGS",
			"timing": 0,
		},
		{
			"type": "UPDATE_TAG",
			"timing": 125,
			"songIndex": 0,
			"field": "Artist",
			"newVal": "D",
			"originalVal": ""
		},
		{
			"type": "UPDATE_TAG",
			"timing": 125,
			"songIndex": 0,
			"field": "Artist",
			"newVal": "Da",
			"originalVal": ""
		},
		{
			"type": "UPDATE_TAG",
			"timing": 125,
			"songIndex": 0,
			"field": "Artist",
			"newVal": "Dav",
			"originalVal": ""
		},
		{
			"type": "UPDATE_TAG",
			"timing": 125,
			"songIndex": 0,
			"field": "Artist",
			"newVal": "Davi",
			"originalVal": ""
		},
		{
			"type": "UPDATE_TAG",
			"timing": 125,
			"songIndex": 0,
			"field": "Artist",
			"newVal": "David",
			"originalVal": ""
		},
		{
			"type": "UPDATE_TAG",
			"timing": 125,
			"songIndex": 0,
			"field": "Artist",
			"newVal": "David ",
			"originalVal": ""
		},
		{
			"type": "UPDATE_TAG",
			"timing": 125,
			"songIndex": 0,
			"field": "Artist",
			"newVal": "David B",
			"originalVal": ""
		},
		{
			"type": "UPDATE_TAG",
			"timing": 125,
			"songIndex": 0,
			"field": "Artist",
			"newVal": "David Bo",
			"originalVal": ""
		},
		{
			"type": "UPDATE_TAG",
			"timing": 125,
			"songIndex": 0,
			"field": "Artist",
			"newVal": "David Bow",
			"originalVal": ""
		},
		{
			"type": "UPDATE_TAG",
			"timing": 125,
			"songIndex": 0,
			"field": "Artist",
			"newVal": "David Bowi",
			"originalVal": ""
		},
		{
			"type": "UPDATE_TAG",
			"timing": 125,
			"songIndex": 0,
			"field": "Artist",
			"newVal": "David Bowie",
			"originalVal": ""
		},
		{
			"type": "CELL_BLURRED",
			"timing": 0,
		},
		{
			"type": "VIEW_EDITED_TAGS",
			"timing": 0,
		},
		{
			"type": "CELL_BLURRED",
			"timing": 0,
		},
		{
			"type": "VIEW_EDITED_TAGS",
			"timing": 0,
		},
		{
			"type": "UPDATE_TAG",
			"timing": 125,
			"songIndex": 0,
			"field": "Year",
			"newVal": "1",
			"originalVal": ""
		},
		{
			"type": "UPDATE_TAG",
			"timing": 125,
			"songIndex": 0,
			"field": "Year",
			"newVal": "19",
			"originalVal": ""
		},
		{
			"type": "UPDATE_TAG",
			"timing": 125,
			"songIndex": 0,
			"field": "Year",
			"newVal": "197",
			"originalVal": ""
		},
		{
			"type": "UPDATE_TAG",
			"timing": 125,
			"songIndex": 0,
			"field": "Year",
			"newVal": "1973",
			"originalVal": ""
		},
		{
			"type": "CELL_BLURRED",
			"timing": 0,
		},
		{
			"type": "VIEW_EDITED_TAGS",
			"timing": 0,
		},
		{
			"type": "UPDATE_TAG",
			"timing": 125,
			"songIndex": 0,
			"field": "Track",
			"newVal": "1",
			"originalVal": ""
		},
		{
			"type": "CELL_BLURRED",
			"timing": 0,
		},
		{
			"type": 'CHANGE_TUTORIAL_TEXT',
			"timing": 1000,
			"text": 'But the real power of the app is its ability to turn the file path automatically into tags. Just select the text in the file path with your cursor to start mapping.',
		},
	],
	[
		{
			"type": "HIDE_TUTORIAL_TEXT",
			"timing": 0,
		},
		{
		    "type": "CREATE_UNMAPPED_PATTERN",
		    "timing": 500,
		    "patternIndex": 0,
		    "textStart": 0,
		    "textEnd": 11
		},
		{
			"type": "MAP_PATTERN",
			"timing": 1000,
			"patternIndex": 0,
			"mapping": "Artist"
		},
		{
		    "type": "CREATE_UNMAPPED_PATTERN",
		    "timing": 500,
		    "patternIndex": 1,
		    "textStart": 1,
		    "textEnd": 5
		},
		{
			"type": "MAP_PATTERN",
			"timing": 1000,
			"patternIndex": 2,
			"mapping": "Year"
		},
		{
		    "type": "CREATE_UNMAPPED_PATTERN",
		    "timing": 500,
		    "patternIndex": 3,
		    "textStart": 1,
		    "textEnd": 13
		},
		{
			"type": "MAP_PATTERN",
			"timing": 1000,
			"patternIndex": 4,
			"mapping": "Title"
		},
		{
			"type": "CHANGE_TUTORIAL_TEXT",
			"timing": 2000,
			"text": 'If you make a mistake like we did here, just click the mapping label above the incorrectly mapped portion of the file path. In this case, we\'ll click the word "Title" to unmap that part.',
		},
	],
	[
		{
			"type": "HIDE_TUTORIAL_TEXT",
			"timing": 0,
		},
		{
			"type": "DELETE_PATTERN",
			"timing": 1000,
			"patternIndex": 4
		},
		{
		    "type": "CREATE_UNMAPPED_PATTERN",
		    "timing": 500,
		    "patternIndex": 3,
		    "textStart": 1,
		    "textEnd": 13
		},
		{
			"type": "MAP_PATTERN",
			"timing": 1000,
			"patternIndex": 4,
			"mapping": "Album"
		},
		{
		    "type": "CREATE_UNMAPPED_PATTERN",
		    "timing": 500,
		    "patternIndex": 5,
		    "textStart": 1,
		    "textEnd": 3
		},
		{
			"type": "MAP_PATTERN",
			"timing": 1000,
			"patternIndex": 6,
			"mapping": "Track"
		},
		{
		    "type": "CREATE_UNMAPPED_PATTERN",
		    "timing": 500,
		    "patternIndex": 7,
		    "textStart": 1,
		    "textEnd": 15
		},
		{
			"type": "MAP_PATTERN",
			"timing": 1000,
			"patternIndex": 8,
			"mapping": "Title"
		},
		{
			"type": "CHANGE_TUTORIAL_TEXT",
			"timing": 2000,
			"text": 'Perfect!',
		},
	],
	[
		{
			"type": "CHANGE_TUTORIAL_TEXT",
			"timing": 0,
			"text": 'At any point, you can switch between your manual edits, the pattern results, and the current version of the tags.',
		},
	],
	[
		{
			"type": "HIDE_TUTORIAL_TEXT",
			"timing": 0,
		},
		{
			"type": "VIEW_EDITED_TAGS",
			"timing": 1000,
		},
		{
			"type": "VIEW_ORIGINAL_TAGS",
			"timing": 3000,
		},
		{
			"type": "VIEW_PATTERN_TAGS",
			"timing": 3000,
		},
		{
			"type": "CHANGE_TUTORIAL_TEXT",
			"timing": 2000,
			"text": 'You can change the number of parent directories you wish to see in the pattern builder.',
		},
	],
	[
		{
			"type": "HIDE_TUTORIAL_TEXT",
			"timing": 0,
		},
		{
			"type": "CHANGE_NUMBER_OF_DIRECTORIES",
			"timing": 1000,
			"change": 3
		},
		{
			"type": "CHANGE_NUMBER_OF_DIRECTORIES",
			"timing": 750,
			"change": 4
		},
		{
			"type": "CHANGE_NUMBER_OF_DIRECTORIES",
			"timing": 750,
			"change": 5
		},
		{
			"type": "CHANGE_NUMBER_OF_DIRECTORIES",
			"timing": 750,
			"change": 4
		},
		{
			"type": "CHANGE_NUMBER_OF_DIRECTORIES",
			"timing": 750,
			"change": 3
		},
		{
			"type": "CHANGE_TUTORIAL_TEXT",
			"timing": 1000,
			"text": 'When you\'re happy with your changes, click the "Save Changes" button.',
		},
	],
	[
		{
			"type": "HIDE_TUTORIAL_TEXT",
			"timing": 0,
		},
		{
			"type": "SAVE_TAGS",
			"timing": 500,
			"songs": [
				{
					"Artist": "David Bowie",
					"Disc": "",
					"Track": 1,
					"Album Artist": "",
					"Album": "Aladdin Sane",
					"Year": 1973,
					"Genre": "",
					"Title": "Watch that Man",
					"Composer": "",
					"filepath": "/Users/hotness/music/tutorial/tracks/David Bowie/1973 Aladdin Sane/01 Watch that Man.m4a",
					"remainingPath": ""
				},
				{
					"Artist": "David Bowie",
					"Disc": "",
					"Track": 2,
					"Album Artist": "",
					"Album": "Aladdin Sane",
					"Year": 1973,
					"Genre": "",
					"Title": "Aladdin Sane",
					"Composer": "",
					"filepath": "/Users/hotness/music/tutorial/tracks/David Bowie/1973 Aladdin Sane/02 Aladdin Sane.m4a",
					"remainingPath": ""
				},
				{
					"Artist": "David Bowie",
					"Disc": "",
					"Track": 3,
					"Album Artist": "",
					"Album": "Aladdin Sane",
					"Year": 1973,
					"Genre": "",
					"Title": "Drive-In Saturday",
					"Composer": "",
					"filepath": "/Users/hotness/music/tutorial/tracks/David Bowie/1973 Aladdin Sane/03 Drive-In Saturday.m4a",
					"remainingPath": ""
				},
				{
					"Artist": "David Bowie",
					"Disc": "",
					"Track": 4,
					"Album Artist": "",
					"Album": "Aladdin Sane",
					"Year": 1973,
					"Genre": "",
					"Title": "Panic in Detroit",
					"Composer": "",
					"filepath": "/Users/hotness/music/tutorial/tracks/David Bowie/1973 Aladdin Sane/04 Panic in Detroit.m4a",
					"remainingPath": ""
				},
				{
					"Artist": "David Bowie",
					"Disc": "",
					"Track": 5,
					"Album Artist": "",
					"Album": "Aladdin Sane",
					"Year": 1973,
					"Genre": "",
					"Title": "Cracked Actor",
					"Composer": "",
					"filepath": "/Users/hotness/music/tutorial/tracks/David Bowie/1973 Aladdin Sane/05 Cracked Actor.m4a",
					"remainingPath": ""
				},
				{
					"Artist": "David Bowie",
					"Disc": "",
					"Track": 6,
					"Album Artist": "",
					"Album": "Aladdin Sane",
					"Year": 1973,
					"Genre": "",
					"Title": "Time",
					"Composer": "",
					"filepath": "/Users/hotness/music/tutorial/tracks/David Bowie/1973 Aladdin Sane/06 Time.m4a",
					"remainingPath": ""
				},
				{
					"Artist": "David Bowie",
					"Disc": "",
					"Track": 7,
					"Album Artist": "",
					"Album": "Aladdin Sane",
					"Year": 1973,
					"Genre": "",
					"Title": "The Prettiest Star",
					"Composer": "",
					"filepath": "/Users/hotness/music/tutorial/tracks/David Bowie/1973 Aladdin Sane/07 The Prettiest Star.m4a",
					"remainingPath": ""
				},
				{
					"Artist": "David Bowie",
					"Disc": "",
					"Track": 8,
					"Album Artist": "",
					"Album": "Aladdin Sane",
					"Year": 1973,
					"Genre": "",
					"Title": "Let's Spend the Night Together",
					"Composer": "",
					"filepath": "/Users/hotness/music/tutorial/tracks/David Bowie/1973 Aladdin Sane/08 Let's Spend the Night Together.m4a",
					"remainingPath": ""
				},
				{
					"Artist": "David Bowie",
					"Disc": "",
					"Track": 9,
					"Album Artist": "",
					"Album": "Aladdin Sane",
					"Year": 1973,
					"Genre": "",
					"Title": "The Jean Genie",
					"Composer": "",
					"filepath": "/Users/hotness/music/tutorial/tracks/David Bowie/1973 Aladdin Sane/09 The Jean Genie.m4a",
					"remainingPath": ""
				},
				{
					"Artist": "David Bowie",
					"Disc": "",
					"Track": 10,
					"Album Artist": "",
					"Album": "Aladdin Sane",
					"Year": 1973,
					"Genre": "",
					"Title": "Lady Grinning Soul",
					"Composer": "",
					"filepath": "/Users/hotness/music/tutorial/tracks/David Bowie/1973 Aladdin Sane/10 Lady Grinning Soul.m4a",
					"remainingPath": ""
				}
			]
		},
		{
			"type": "CHANGE_TUTORIAL_TEXT",
			"timing": 1000,
			"text": 'If you make a mistake, you can always undo your changes by clicking the "Undo" button in the upper left.',
		},
	],
	[
		{
			"type": "HIDE_TUTORIAL_TEXT",
			"timing": 0,
		},
		{
			"type": "@@redux-undo/UNDO",
			"timing": 500,
			"songs": [
				{
					"Artist": "",
					"Disc": "",
					"Track": "",
					"Album Artist": "",
					"Album": "",
					"Year": "",
					"Genre": "",
					"Title": "01 Watch that Man.m4a",
					"Composer": "",
					"filepath": "/Users/hotness/music/tutorial/tracks/David Bowie/1973 Aladdin Sane/01 Watch that Man.m4a"
				},
				{
					"Artist": "",
					"Disc": "",
					"Track": "",
					"Album Artist": "",
					"Album": "",
					"Year": "",
					"Genre": "",
					"Title": "02 Aladdin Sane.m4a",
					"Composer": "",
					"filepath": "/Users/hotness/music/tutorial/tracks/David Bowie/1973 Aladdin Sane/02 Aladdin Sane.m4a"
				},
				{
					"Artist": "",
					"Disc": "",
					"Track": "",
					"Album Artist": "",
					"Album": "",
					"Year": "",
					"Genre": "",
					"Title": "03 Drive-In Saturday.m4a",
					"Composer": "",
					"filepath": "/Users/hotness/music/tutorial/tracks/David Bowie/1973 Aladdin Sane/03 Drive-In Saturday.m4a"
				},
				{
					"Artist": "",
					"Disc": "",
					"Track": "",
					"Album Artist": "",
					"Album": "",
					"Year": "",
					"Genre": "",
					"Title": "04 Panic in Detroit.m4a",
					"Composer": "",
					"filepath": "/Users/hotness/music/tutorial/tracks/David Bowie/1973 Aladdin Sane/04 Panic in Detroit.m4a"
				},
				{
					"Artist": "",
					"Disc": "",
					"Track": "",
					"Album Artist": "",
					"Album": "",
					"Year": "",
					"Genre": "",
					"Title": "05 Cracked Actor.m4a",
					"Composer": "",
					"filepath": "/Users/hotness/music/tutorial/tracks/David Bowie/1973 Aladdin Sane/05 Cracked Actor.m4a"
				},
				{
					"Artist": "",
					"Disc": "",
					"Track": "",
					"Album Artist": "",
					"Album": "",
					"Year": "",
					"Genre": "",
					"Title": "06 Time.m4a",
					"Composer": "",
					"filepath": "/Users/hotness/music/tutorial/tracks/David Bowie/1973 Aladdin Sane/06 Time.m4a"
				},
				{
					"Artist": "",
					"Disc": "",
					"Track": "",
					"Album Artist": "",
					"Album": "",
					"Year": "",
					"Genre": "",
					"Title": "07 The Prettiest Star.m4a",
					"Composer": "",
					"filepath": "/Users/hotness/music/tutorial/tracks/David Bowie/1973 Aladdin Sane/07 The Prettiest Star.m4a"
				},
				{
					"Artist": "",
					"Disc": "",
					"Track": "",
					"Album Artist": "",
					"Album": "",
					"Year": "",
					"Genre": "",
					"Title": "08 Let's Spend the Night Together.m4a",
					"Composer": "",
					"filepath": "/Users/hotness/music/tutorial/tracks/David Bowie/1973 Aladdin Sane/08 Let's Spend the Night Together.m4a"
				},
				{
					"Artist": "",
					"Disc": "",
					"Track": "",
					"Album Artist": "",
					"Album": "",
					"Year": "",
					"Genre": "",
					"Title": "09 The Jean Genie.m4a",
					"Composer": "",
					"filepath": "/Users/hotness/music/tutorial/tracks/David Bowie/1973 Aladdin Sane/09 The Jean Genie.m4a"
				},
				{
					"Artist": "",
					"Disc": "",
					"Track": "",
					"Album Artist": "",
					"Album": "",
					"Year": "",
					"Genre": "",
					"Title": "10 Lady Grinning Soul.m4a",
					"Composer": "",
					"filepath": "/Users/hotness/music/tutorial/tracks/David Bowie/1973 Aladdin Sane/10 Lady Grinning Soul.m4a"
				}
			]
		},
		{
			"type": "CHANGE_TUTORIAL_TEXT",
			"timing": 1000,
			"text": 'And of course, you can redo them as well.',
		},
	],
	[
		{
			"type": "HIDE_TUTORIAL_TEXT",
			"timing": 0,
		},
		{
			"type": "@@redux-undo/REDO",
			"timing": 500,
		},
		{
			"type": "CHANGE_TUTORIAL_TEXT",
			"timing": 1000,
			"text": "That's it!",
		},
	],
]

export default {init, welcome, main}