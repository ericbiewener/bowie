#!/usr/bin/env bash

# Annoying, but the only dependable way I've found to ensure that the
# RVM-managed version of ruby gets used rather than the system ruby
source ~/.rvm/scripts/rvm
ruby "$1" "$2"