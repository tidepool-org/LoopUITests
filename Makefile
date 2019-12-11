debug-build:
	rm -rf build
	mkdir build
	cd  build && \
	git clone --branch=darinkrauss/dev --recurse-submodules https://github.com/tidepool-org/LoopWorkspace && \
	xcodebuild -workspace LoopWorkspace/Loop.xcworkspace -scheme 'Loop (Workspace)' -configuration Debug -destination 'name=iPhone 8' build SYMROOT="$(pwd)"

release-build:
	rm -rf build
	mkdir build
	cd build && \
	git clone --branch=master --recurse-submodules https://github.com/tidepool-org/LoopWorkspace && \
	xcodebuild -workspace LoopWorkspace/Loop.xcworkspace -scheme 'Loop (Workspace)' -configuration Release -destination 'name=iPhone 8' build SYMROOT="$(pwd)"