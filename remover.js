function remove (user, collection) {

  let index = collection.forEach( (userObj, i) => {
    if (userObj.name == user) {
      console.log('\nindex from the inside: ', i, '\n');
      return i;
    }
  });

  console.log('index from the outside: ', index, '\n');

  if (index == -1) {
    console.log('\nERROR: could not find that user name', '... index: ', index, '\n');
  }


  else {
    collection.splice(index,1);
  }
}

exports.remove = remove;
