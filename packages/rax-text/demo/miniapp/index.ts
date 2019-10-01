Page({
    onClick(e){
        my.alert({title:"click success"})
    },
    onAppear(){
        console.log("child appear")
    },
    onEndReached(e){
        console.info("end")
    },
    onScroll(e){
        console.log("scroll")
    }
});
