debug-build:
	rm -rf build
	mkdir build
	cd  build && \
	git clone --branch=darinkrauss/dev --recurse-submodules https://github.com/tidepool-org/LoopWorkspace && \
	xcodebuild -workspace LoopWorkspace/Loop.xcworkspace -scheme 'Loop (Workspace)' -configuration Debug -sdk iphonesimulator

release-build:
	rm -rf build
	mkdir build
	cd build && \
	git clone --branch=master --recurse-submodules https://github.com/tidepool-org/LoopWorkspace && \
	xcodebuild -workspace build/LoopWorkspace/Loop.xcworkspace -scheme 'Loop (Workspace)' -configuration Release -sdk iphonesimulator