# get current branch
current_branch=$(git rev-parse --abbrev-ref HEAD)

# get main branch
main_branch=$(git rev-parse --abbrev-ref main)

# get master branch
master_branch=$(git rev-parse --abbrev-ref master)

# get remote
remote=$(git config --get remote.origin.url)

#merge main branch into master
git checkout $master_branch
git merge $main_branch

# push to remote
git push $remote $master_branch

# checkout current branch
git checkout $current_branch
