import {StyleSheet} from 'react-native';

export default Styles = {
    styles: StyleSheet.create({
            completedStatus: {
                color:"#00B300",
            },
            scheduledStatus: {
                color:"#5AA83E",
                borderWidth:1,
                borderColor:"#5AA83E",
                paddingLeft:3,
                paddingRight:3,
                paddingTop:4,
                borderRadius:3,
                fontSize:10,
                textAlign:"center",
                textAlignVertical:"center"
            },
            cancelledStatus: {
                color:"#FF0000",
            },
            pageHeaderButton:{
                color:"#43C9FE",
                fontSize:13,
                fontWeight:"bold"
            },
            pageFooterButton:{
                position:"absolute",
                bottom:0,
                padding:10,
                height:40,
                backgroundColor:"white",
                width:"100%",
                flexDirection:"row",
                justifyContent:"center",
                alignItems:"center"
            },
            pageFooterButtonLeft:{
                width:"50%",
                justifyContent:"center",
                alignItems:"center",
            },
            pageFooterButtonRight:{
                width:"50%",
                justifyContent:"center",
                alignItems:"center",
            },
            pageFooterButtonText:{
                color:"#43C9FE",
                fontSize:13,
                fontWeight:"bold"
            },
            pageFooterButtonTextRed:{
                color:"red",
                fontSize:13,
            },
            vitalsSection: {
                flexDirection:'column',
                alignItems:'center',
                width:"100%",
                minHeight:70,
                paddingBottom:10,
            },
            notesSection: {
                flexDirection:'column',
                alignItems:'center',
                width:"100%",
                minHeight:70,
                paddingBottom:10,
            },
            sectionHeader: {
                color:"#8F8E94",
                fontSize:15,
                paddingBottom:5,
                paddingLeft:10,
                paddingRight:10,
                paddingTop:10
              },
              sectionHeaderAdd: {
                color:"#43C9FE",
                fontSize:13,
                paddingBottom:5,
                paddingLeft:10,
                paddingRight:10,
                paddingTop:10,
                textAlign:"right",
                fontWeight:"bold"
              },
              sectionContent: {
                backgroundColor:"white",
                width:"100%",
                padding:10, 
                alignItems:"center",
                justifyContent:"center"
              },
              procedureSectionContent: {
                backgroundColor:"white",
                width:"100%",
                padding:10, 
                display:"flex",
                flexDirection:"row",
                flexWrap:"wrap",
                alignItems:"center",
                justifyContent:"center"
              },
              vitals: {
                flexDirection:"column",
                alignItems:"center",
                },

                procedure: {
                    flexDirection:"column",
                    alignItems:"center",
                    backgroundColor:"#DEDEDE",
                    borderRadius:10,
                    paddingLeft:20,
                    paddingRight:20,
                    paddingTop:5,
                    paddingBottom:5,
                    margin:5, 
                    },
  
                  navbar: {
                    width:"100%",
                    height:"10%",
                    opacity:0.75
                  },
        
                  selectedView: {
                    backgroundColor:"#0F3D68",
                    width:"50%", 
                    padding:5
                },
                unselectedView: {
                    width:"50%", 
                    padding:5
                },
                selectedText: {
                    backgroundColor:"transparent", color:"white", fontWeight:"bold", textAlign:"center"
                },
                unselectedText: {
                    backgroundColor:"transparent", textAlign:"center"
                },
        }),
    colors: {
        brightCyan:"#43C9FE",
        twilightBlue:"#0F3D68",
        midGreen:"#5AA83E",
        purpleyGrey:"#8F8E94",
        paleGrey:"#F2F4F8"
    }
}