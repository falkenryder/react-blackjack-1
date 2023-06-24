# Use git submodule to add required files for step 4
git submodule add git@github.com:bridgeit-co/react-blackjack-step-4.git

# Move the respective files to their intended directories

mv react-blackjack-step-4/checkWin.js src/utils/
mv react-blackjack-step-4/Controls.js src/components/
mv react-blackjack-step-4/Step_4.test.js src/tests/

# Remove paths, tracking, related folders and files once you're done
git submodule deinit -f react-blackjack-step-4
rm -rf react-blackjack-step-4
rm .gitmodules
git rm --cached .gitmodules
git rm --cached react-blackjack-step-4
