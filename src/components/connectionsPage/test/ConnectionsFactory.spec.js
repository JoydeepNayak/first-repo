/*
Licensed Materials - Property of IBM
5724-Q36
(c) Copyright IBM Corp. 2017
US Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with IBM Corp.
*/

import ConnectionsFactory from '../ConnectionsFactory';

describe('landing factory', () => {
  it('has a make function', () => {
    const factory = ConnectionsFactory;
    expect(factory.make).toBeDefined();
  });

  it('always returns a display card with given props', () => {
    const comp1 = ConnectionsFactory.make('xyz', {});
    expect(comp1).not.toBeNull();
    expect(comp1.type).not.toBeNull();
  });
});
