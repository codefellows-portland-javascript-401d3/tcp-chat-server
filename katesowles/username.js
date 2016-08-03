function generate () {
  const badPetNames = ['tootsie', 'honeybunny', 'cutiepie', 'loveydovey', 'schmoopie', 'babycakes', 'bae', 'heyyou'];
  const alpha = badPetNames[Math.floor(Math.random() * badPetNames.length)];
  const numeric = Math.floor(Math.random() * 99);
  return alpha + '_' + numeric;
}

exports.generate = generate;
