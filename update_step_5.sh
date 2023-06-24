# Use git submodule to add required files for step 5
git submodule add git@github.com:bridgeit-co/react-blackjack-step-5.git

# Move the respective files to their intended directories
mv react-blackjack-step-5/Step_5.test.js src/tests/

# Remove paths, tracking, related folders and files once you're done
git submodule deinit -f react-blackjack-step-5
rm -rf react-blackjack-step-5
rm .gitmodules
git rm --cached .gitmodules
git rm --cached react-blackjack-step-5
