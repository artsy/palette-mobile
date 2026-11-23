source 'https://rubygems.org'

ruby '>= 2.6.10'

# Exclude problematic versions of cocoapods and activesupport that causes build failures.
gem 'cocoapods', '1.16.2'
gem 'activesupport', '>= 6.1.7.5', '!= 7.1.0'
gem 'xcodeproj'
gem 'concurrent-ruby', '< 1.3.8'

# Ruby 3.4 moved nkf (which provides kconv, required by CFPropertyList via xcodeproj) out of the
# default gems, so it must be declared for `pod install` to work under bundler.
gem 'nkf'
