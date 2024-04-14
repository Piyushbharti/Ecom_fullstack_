export const srpReducer = (state, action) => {
    switch (action.type) {
        case 'COUNT':
            return {
                ...state,
                cartCount: action.payload
            };
        case 'PopHandle':
            return {
                ...state,
                isPopUpOpen: action.payload
            };
        case 'HandleCart':
            return {
                ...state,
                cartValue: action.payload
            };
    }
};
