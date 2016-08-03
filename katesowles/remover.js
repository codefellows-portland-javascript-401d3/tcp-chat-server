function remove (user, collection) {

  let index = -1;
  for (let i = 0; i < collection.length; i++) {
    if (collection[i].name == user) {
      index = i;
    }
  }

  if (index == -1) {
    console.log('\nERROR: could not find that user name', '... index: ', index, '\n');
  }
  else {
    collection.splice(index,1);
  }
}

exports.remove = remove;
