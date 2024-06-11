import { useState, useEffect, useRef } from "react";

import {
  Flex,
  Button,
  Grid,
  GridItem,
  Img,
  Text,
  Heading,
  useDisclosure,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Textarea,
  VStack,
  InputGroup,
  InputRightElement,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

function HomePage() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = () => {
    fetch("/api/images")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setImages(data))
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  };

  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleInsert = () => {
    fetch("/api/images", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl, title, description }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to insert image");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Image inserted successfully:", data);
        fetchImages();
        onInsertModalClose();
      })
      .catch((error) => {
        console.error("Error inserting image:", error);
      });
  };

  const [editImageId, setEditImageId] = useState("");
  const [editImageUrl, setEditImageUrl] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const handleEdit = () => {
    fetch(`/api/images/${editImageId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imageUrl: editImageUrl,
        title: editTitle,
        description: editDescription,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to edit image");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Image edited successfully:", data);
        fetchImages();
        onEditModalClose();
      })
      .catch((error) => {
        console.error("Error editing image:", error);
      });
  };

  const [deleteImageId, setDeleteImageId] = useState("");

  const handleDelete = () => {
    fetch(`/api/images/${deleteImageId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete image");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Image deleted successfully:", data);
        fetchImages();
        onDeleteModalClose();
      })
      .catch((error) => {
        console.error("Error deleting image:", error);
      });
  };

  const [filterValue, setFilterValue] = useState("");

  const handleFilter = () => {
    const selectedImageId = parseInt(filterValue);

    if (isNaN(selectedImageId) || filterValue === "") {
      fetchImages();
    } else {
      fetch(`/api/images/${selectedImageId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Image filtered successfully:", data);
          setImages([data]);
        })
        .catch((error) => {
          console.error("Error fetching image:", error);
        });
    }
  };

  const {
    isOpen: isInsertModalOpen,
    onOpen: onInsertModalOpen,
    onClose: onInsertModalClose,
  } = useDisclosure();
  const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onClose: onEditModalClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();
  const initialRef = useRef(null);

  return (
    <Flex
      direction="column"
      gap="2rem"
      w="100%"
      minHeight="100vh"
      justify="center"
      align="center"
      p="1rem 10rem 5rem 10rem"
      bgGradient="radial-gradient(circle at 18.7% 37.8%, rgb(250, 250, 250) 0%, rgb(225, 234, 238) 90%)"
    >
      <VStack>
        <HStack>
          <Button colorScheme="teal" size="md" onClick={onInsertModalOpen}>
            Insert Image
          </Button>
          <Button colorScheme="yellow" size="md" onClick={onEditModalOpen}>
            Edit Image
          </Button>
          <Button colorScheme="red" size="md" onClick={onDeleteModalOpen}>
            Delete Image
          </Button>
        </HStack>
        <InputGroup>
          <Input
            type="number"
            placeholder="Enter image ID"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
          <InputRightElement bg="teal" borderRadius="8px">
            <IconButton
              aria-label="Search"
              _hover={{ color: "white" }}
              icon={<Icon as={FaSearch} />}
              onClick={handleFilter}
              variant="ghost"
            />
          </InputRightElement>
        </InputGroup>
        <Button
          colorScheme="teal"
          size="md"
          onClick={() => {
            fetchImages();
            setFilterValue("");
          }}
        >
          Reset filter
        </Button>
      </VStack>

      <Heading as="h1">List of all images</Heading>
      <Grid templateColumns="repeat(3, 1fr)" gap="4rem">
        {images.map((image, index) => (
          <GridItem key={index}>
            <Text fontSize="xl" fontWeight={600}>
              {image.title}
            </Text>
            <Text>{image.description}</Text>
            <Img
              src={image.image_url}
              alt={`Image ${image.id}`}
              borderRadius="12px"
              height="100%"
              aspectRatio="7/4"
              objectFit="cover"
            />
          </GridItem>
        ))}
      </Grid>

      {/* Modals */}
      <Modal
        initialFocusRef={initialRef}
        isOpen={isInsertModalOpen}
        onClose={onInsertModalClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Insert an image</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Image url</FormLabel>
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Image url"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Title</FormLabel>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                maxHeight="10rem"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" size="md" mr={3} onClick={handleInsert}>
              Insert
            </Button>
            <Button onClick={onInsertModalClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isEditModalOpen}
        onClose={onEditModalClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit an image</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Image Id</FormLabel>
              <Input
                value={editImageId}
                onChange={(e) => setEditImageId(e.target.value)}
                placeholder="Image Id"
                ref={initialRef}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Image url</FormLabel>
              <Input
                value={editImageUrl}
                onChange={(e) => setEditImageUrl(e.target.value)}
                placeholder="Image url"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Title</FormLabel>
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Title"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Description"
                maxHeight="10rem"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="yellow" size="md" mr={3} onClick={handleEdit}>
              Edit
            </Button>
            <Button onClick={onEditModalClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isDeleteModalOpen}
        onClose={onDeleteModalClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete an image</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Image Id</FormLabel>
              <Input
                ref={initialRef}
                value={deleteImageId}
                onChange={(e) => setDeleteImageId(e.target.value)}
                placeholder="Image Id"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" size="md" mr={3} onClick={handleDelete}>
              Delete
            </Button>
            <Button onClick={onDeleteModalClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default HomePage;
