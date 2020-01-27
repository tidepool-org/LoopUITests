debug-build:
	. scripts/build_loop.dev.sh Debug uitest-travis-build debug_build_log.txt

release-build:
	. scripts/build_loop.dev.sh Release uitest-travis-build release_build_log.txt