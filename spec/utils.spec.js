process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const {
  formatDates,
  makeRefObj,
  formatComments
} = require('../db/utils/utils');

describe('formatDates', () => {
  it('returns an array when passed an empty array', () => {
    expect(formatDates([])).to.eql([]);
  });
  it('does not mutate the original array', () => {
    const input = [
      {
        body:
          'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
        belongs_to:
          'The People Tracking Every Touch, Pass And Tackle in the World Cup',
        created_by: 'tickle122',
        votes: -1,
        created_at: 1468087638932
      }
    ];
    const control = [
      {
        body:
          'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
        belongs_to:
          'The People Tracking Every Touch, Pass And Tackle in the World Cup',
        created_by: 'tickle122',
        votes: -1,
        created_at: 1468087638932
      }
    ];
    formatDates(input);
    expect(input).to.eql(control);
  });
  it('when passed an array containing one timestamp element within an object, returns a new array containing an object with the timestamp element converted to a JavaScript format', () => {
    const input = [{ created_at: 1504183900263 }];
    const actual = formatDates(input);
    const expected = new Date(1504183900263);
    expect(actual[0].created_at).to.eql(expected);
  });
  it('when passed an array containing a whole object with many keys returns a new array containing the modified key and the remaining keys unaltered', () => {
    const input = [
      {
        body:
          'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
        belongs_to:
          'The People Tracking Every Touch, Pass And Tackle in the World Cup',
        created_by: 'tickle122',
        votes: -1,
        created_at: 1468087638932
      }
    ];
    const actual = formatDates(input);
    const expected = new Date(1468087638932);
    expect(actual[0].created_at).to.eql(expected);
    expect(actual[0]).to.contain.keys(
      'body',
      'belongs_to',
      'created_by',
      'votes'
    );
  });
  it('can handle an array containing multiple objects and will return them with correctly formatted dates', () => {
    const input = [
      {
        body:
          'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
        belongs_to:
          'The People Tracking Every Touch, Pass And Tackle in the World Cup',
        created_by: 'tickle122',
        votes: -1,
        created_at: 1468087638932
      },
      {
        body: 'Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.',
        belongs_to: 'Making sense of Redux',
        created_by: 'grumpy19',
        votes: 7,
        created_at: 1478813209256
      },
      {
        body:
          'Qui sunt sit voluptas repellendus sed. Voluptatem et repellat fugiat. Rerum doloribus eveniet quidem vero aut sint officiis. Dolor facere et et architecto vero qui et perferendis dolorem. Magni quis ratione adipisci error assumenda ut. Id rerum eos facere sit nihil ipsam officia aspernatur odio.',
        belongs_to: '22 Amazing open source React projects',
        created_by: 'grumpy19',
        votes: 3,
        created_at: 1504183900263
      }
    ];
    const actual = formatDates(input);
    const expected0 = new Date(1468087638932);
    const expected1 = new Date(1478813209256);
    const expected2 = new Date(1504183900263);
    expect(actual[0].created_at).to.eql(expected0);
    expect(actual[1].created_at).to.eql(expected1);
    expect(actual[2].created_at).to.eql(expected2);
  });
});

describe('makeRefObj', () => {});

describe('formatComments', () => {});
