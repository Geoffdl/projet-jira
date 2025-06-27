import { selectBoardState } from './board.selectors';

describe('Board Selectors', () => {
    it('should select the feature state', () => {
        expect(selectBoardState).toBeDefined();
    });
});
