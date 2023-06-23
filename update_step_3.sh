# Use git submodule to add required files for step 3
git submodule add git@github.com:bridgeit-co/react-blackjack-step-3.git

# Move the respective files to their intended directories

mv react-blackjack-step-3/calculateScore.js src/utils/
mv react-blackjack-step-3/hand.css src/styles/
mv react-blackjack-step-3/Hand.js src/components/
mv react-blackjack-step-3/Step_3.test.js src/tests/

# Remove paths, tracking, related folders and files once you're done
git submodule deinit -f react-blackjack-step-3
rm -rf react-blackjack-step-3
rm .gitmodules
git rm --cached .gitmodules
git rm --cached react-blackjack-step-3
