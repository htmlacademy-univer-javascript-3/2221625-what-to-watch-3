import { render,screen } from '@testing-library/react';
import VideoPlayer from './video-player';


import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';


describe('Component: ReviewComp', () => {

  it('should render correctly', () => {
    const mockVideoProps = {
      videoId: 'id',
      videoPath: 'path/',
      mute: true,
    };
    const mockFakeStore = makeFakeStore();
    const withHistoryComponent = withHistory(<VideoPlayer {...mockVideoProps}/>);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      mockFakeStore
    );

    render(withStoreComponent);

    expect(screen.getByTestId(`videoTestID ${mockVideoProps.videoId}`)).toBeInTheDocument();
  });
});
