#!/bin/bash

SALT_ROUNDS=10
HASHED=$(node -e "console.log(require('bcrypt').hashSync('$1', $SALT_ROUNDS))")
echo $HASHED
