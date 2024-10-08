import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    items: [],
    status: null
};
const apiUrl = "https://crudapinodejs.onrender.com/api/products"
// const apiUrl = "http://localhost:3000/api/products"

const addProduct = async (product) => {
    return await axios.post(apiUrl, product);
}

export const productsFetch = createAsyncThunk(
    "products/productsFetch",
    async (id = null, {rejectWithValue}) => {
        const response = await axios.get(apiUrl);
        return response?.data;
    }
)
const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        createProduct(state, action) {
            let tempProduct = action.payload;
            state.items.push(tempProduct);
            addProduct(tempProduct).then( res => {
                toast.success(`New Product ${action.payload.name} created successfuly`, {
                    position: "bottom-left",
                });
            }).catch(err => {
                toast.error(`New Product ${action.payload.name} created failed`, {
                    position: "bottom-left",
                });
                console.log(err);
            })
            
        },
        clearProducts(state, action) {
            state.items = [];
        },
        increaseProductAmount(state, action) {
            const findIndex = state.items.findIndex(
                (item) => item.id === action.payload.id
            );
            if(findIndex >= 0) {
                state.items[findIndex].amount += 1;
                toast.warning(`Amount Product ${action.payload.name} increase successfuly to
                    ${state.items[findIndex].amount}`, {
                    position: "bottom-left",
                });
            } else {
                toast.error(`Product ${action.payload.name} increased ammount failed`, {
                    position: "bottom-left",
                });
            }
        },
        decreaseProductAmount(state, action) {
            const findIndex = state.items.findIndex(
                (item) => item.id === action.payload.id
            );
            if(findIndex >= 0) {
                state.items[findIndex].amount -= 1;
                // toast.warning(`Amount Product ${action.payload.name} increase successfuly to
                // ${state.items[findIndex].amount}`, {
                //     position: "bottom-left",
                // });
            } else {
                console.log('some error occurs increasing amount');
                toast.error(`Product ${action.payload.name} increased amount failed`, {
                    position: "bottom-left",
                });
            }
        }
    },
    extraReducers(builder) {
        builder
        .addCase(productsFetch.pending, (state, action) => {
            state.status = "loading"
        })
        .addCase(productsFetch.fulfilled, (state, action) => {
            state.status = "success"
            state.items = state.items.concat(action.payload);
        })
        .addCase(productsFetch.rejected, (state, action) => {
            state.status = "failed"
            // state.error = action.error.message
        })
    }
})

export const { createProduct, 
    increaseProductAmount, decreaseProductAmount,
    clearProducts } = productsSlice.actions;
export default productsSlice.reducer;