#!/bin/bash

TASK=$1
VERSION=$2

# When performing a release build, the version number and changelog will be committed and tagged.
RELEASE=false

if [ "$TASK" = "release" ]; then
    echo Building RELEASE $VERSION
    RELEASE=true
else
    VERSION=`grep version package.json | head -n1 | cut -d \" -f4;`
    TIMESTAMP=`TZ=UTC date +%Y%m%d%H%M`
    TIMESTAMPED_VERSION=`echo $VERSION | sed -r "s/-0/-$TIMESTAMP/g"`
    VERSION=$TIMESTAMPED_VERSION

    echo Building SNAPSHOT $VERSION
fi

if $RELEASE ; then
	npm version $NPM_VERSION
fi

npm install
npm run build

# Post-release cleanup.
if $RELEASE ; then
    BRANCH=`git rev-parse --abbrev-ref HEAD`
    echo Pushing commits and tags for $VERSION to $BRANCH
    git push origin $BRANCH && git push --tags

    # Bump the version number and add a -0 (SNAPSHOT) suffix.
	npm version prepatch

    # Push the commit for the SNAPSHOT version.
    echo Pushing commits for next SNAPSHOT version to $BRANCH
    git push origin $BRANCH
fi

