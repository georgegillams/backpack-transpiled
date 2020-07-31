import React from 'react';
import { render } from '@testing-library/react';
import BpkButton from 'backpack-transpiled/bpk-component-button';

describe('<BpkButton />', () => {
  it('should render correctly', () => {
    const { container } = render(<BpkButton>This is a button</BpkButton>);

    expect(container).toMatchSnapshot();
  });
});
