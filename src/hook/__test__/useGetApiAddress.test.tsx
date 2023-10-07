import { renderHook } from '@testing-library/react';
import { useGetApiAddress } from '../useGetApiAddress';
import * as apiAddressSlice from '../../app/actions/apiAddressSlice';
import { Provider } from 'react-redux';
import { store } from '../../app/store';

describe('useGetApiAddress', () => {
    let getAddressSpy: jest.SpyInstance;

    beforeEach(() => {
        getAddressSpy = jest.spyOn(apiAddressSlice, 'getAddress');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should call getAddress with the correct link', () => {
        const uuid = '12345-67890-12345';
        localStorage.setItem("uuid", uuid);
        const mockApiUrl = 'http://example.com/api';
        const expectedLink = `${mockApiUrl}/address/${uuid}`;

        process.env.REACT_APP_API_URL_LOCAL = mockApiUrl;
        localStorage.getItem = jest.fn().mockReturnValue(uuid);

        const { result } = renderHook(() => useGetApiAddress(), {
            // Wrap the hook in the Redux Provider with the appropriate store
            wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
        });
        result.current.callGetApiAddress();

        expect(getAddressSpy).toHaveBeenCalledWith({ link: expectedLink });
    });
});