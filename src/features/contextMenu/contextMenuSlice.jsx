import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    visible : false,
    x:0,
    y:0,
}

const contextMenuSlice = createSlice({
    name:"contextMenu",
    initialState,
    reducers:{
        showContextMenu:(state,action)=>{
            const {x,y} = action.payload
            state.visible = true,
            state.x = x,
            state.y = y
        },
        hideContextMenu:(state,action)=>{
            state.visible = false
        }
    }
})
export const {showContextMenu,hideContextMenu} = contextMenuSlice.actions
export default contextMenuSlice.reducer