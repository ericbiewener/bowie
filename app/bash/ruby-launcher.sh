#!/usr/bin/env bash

# Route all ruby script launching through this script. Annoying, but the only
# dependable way I've found to ensure that the RVM-managed version of ruby 
# gets used rather than the system ruby.

# `source` command will throw error "shell_session_update: command not found"
# because it is being run outside of the shell. This can be ignored.
source ~/.rvm/scripts/rvm
ruby "$1" "$2"