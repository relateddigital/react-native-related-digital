require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name         = package['name']
  s.version      = package['version']
  s.summary      = package['description']
  s.license      = package['license']

  s.authors      = package['author']
  s.homepage     = package['homepage']
  s.platforms    = { :ios => "10.0" }

  s.source       = { :git => "https://bitbucket.org/AhmetKiziltan/related-push-sdk.git" }
  s.source_files  = "ios/RNRelatedDigital/**/*"

  s.dependency 'React'
  s.dependency 'VisilabsIOS', '3.4.3'
  s.dependency 'Euromsg', '2.5.4'
	
end
