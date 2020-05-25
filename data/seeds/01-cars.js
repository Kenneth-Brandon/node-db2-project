exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('cars')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {
          id: 1,
          vin: '092L7455F2346034O',
          make: 'Dodge',
          model: 'Caravan',
          mileage: '23005',
          transmission: 'Auto',
          titlestatus: 'Clean',
        },
        {
          id: 2,
          vin: '6FTF48213G2834923',
          make: 'Dodge',
          model: 'Dart Rallye',
          mileage: '74125',
          transmission: 'Auto',
          titlestatus: 'Clean',
        },
      ]);
    });
};
