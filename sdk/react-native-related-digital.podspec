require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name          = package['name']
  s.version       = package['version']
  s.summary       = package['description']
  s.license       = package['license']

  s.authors       = package['author']
  s.homepage      = package['homepage']
  s.platforms     = { :ios => "10.0" }
  s.swift_version = '5.0'
  s.source        = { :git => "https://github.com/relateddigital/react-native-related-digital.git" }
  s.source_files  = "ios/RNRelatedDigital/**/*.{swift,h,m,xib}"

  s.dependency 'React'
  s.dependency 'VisilabsIOS', '3.6.8'
  s.dependency 'Euromsg', '2.6.0'
	
end
