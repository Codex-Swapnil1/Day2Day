import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Text,
    useToast,
    Input,
  } from '@chakra-ui/react'
import axios from 'axios'


function UpdateProduct({id}) {
    
    let _id=id;
    //  console.log(_id)
    const toast = useToast()
    const OverlayOne = () => (
      <ModalOverlay
        bg='blackAlpha.300'
        backdropFilter='blur(10px) hue-rotate(90deg)'
      />
    )
  
    const OverlayTwo = () => (
      <ModalOverlay
        bg='none'
        backdropFilter='auto'
        backdropInvert='80%'
        backdropBlur='2px'
      />
    )

    // api/admin/product/
  
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = React.useState(<OverlayOne />)
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState();
    const [stock, setStock] = useState();
    const [category, setCategory] = useState("");
    const [url, setUrl]=useState("")
    const [description, setDescription] = useState("")
    
    const newData =
    {
        title: title,
        description: description,
        category: category,
        images: [
            {
                url: url
            }
        ],
        price: +price,
        stock: +stock
    }



//     const deleteFunc = async (id) => {
//         try {
//             await fetch(`https://awful-pear-bedclothes.cyclic.app/api/admin/product/${id}`, {
//                 method: "DELETE",
//                 headers: {
//                     "Content-type": "application/json"
//                 }
//             }).then((res) => res.json())
//                 .then((res) => console.log(res))
//                 // .then(res => getData())
//         } catch (err) {
//             console.log(err)
//         }
//     }


    const Update=(id)=>{
        // console.log(newData)
        axios.put(`https://awful-pear-bedclothes.cyclic.app/api/admin/product/${id}`,{newData},{
          headers:{
            "Authorization":localStorage.getItem("token")
          }
        }).then((res) => {
            // console.log(res)
            if(res.success==true){
              window.location.reload();
                toast({
                    title: "Data deleted successful",
                    position: "top",
                    isClosable: true,
                  })
            }else{
                toast({
                    title: "Error",
                    position: "top",
                    isClosable: true,
                  })
            }
        }).catch((error) => {
            console.log("error", error)
            if(error){
                toast({
                title: "Something went wrong",
                status: "error",
                position: "top",
                isClosable: true,
              })
            }
            
        });
    }
  
    return (
      <>
        <Button
          ml='4'
          onClick={() => {
            setOverlay(<OverlayTwo />)
            onOpen()
          }}
        >
          Update
        </Button>
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          {overlay}
          <ModalContent>
            <ModalHeader>Update Product</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>What you want to update...</Text>
              <Input placeholder='Title' onChange={(e)=>setTitle(e.target.value)}/>
              <Input placeholder='Updated Description' onChange={(e)=>setDescription(e.target.value)} />
              <Input placeholder='New category' onChange={(e)=>setCategory(e.target.value)} />
              <Input placeholder='New Image Url' onChange={(e)=>setUrl(e.target.value)} />
              <Input placeholder='New Price' onChange={(e)=>setPrice(e.target.value)} />
              <Input placeholder='New Stock' onChange={(e)=>setStock(e.target.value)} />
            </ModalBody>
            <ModalFooter>
              <Button onClick={()=>{
                Update(_id)
                // deleteFunc()
                onClose()  
              } }>Confirm</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }


  export default UpdateProduct;