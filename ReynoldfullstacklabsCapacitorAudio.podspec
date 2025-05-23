
  Pod::Spec.new do |s|
    s.name = 'ReynoldfullstacklabsCapacitorAudio'
    s.version = '0.0.1'
    s.summary = 'Audio plugin for capacitor enable background playing and control center integration'
    s.license = 'MIT'
    s.homepage = 'github.com/reynoldfullstacklabs/capacitor-audio'
    s.author = 'reynoldfullstacklabs'
    s.source = { :git => 'github.com/reynoldfullstacklabs/capacitor-audio', :tag => s.version.to_s }
    s.source_files = 'ios/Plugin/**/*.{swift,h,m,c,cc,mm,cpp}'
    s.ios.deployment_target  = '12.0'
    s.dependency 'Capacitor'
  end