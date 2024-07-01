import {render} from '@testing-library/react';
import ModalView from '../ModalView';
import {MemoryRouter} from 'react-router';

describe('ModalView', () => {
  test('basic', () => {
    const result = render(<MemoryRouter>
      <ModalView/>
    </MemoryRouter>);
    expect(result.container).toMatchSnapshot();
  });
});

