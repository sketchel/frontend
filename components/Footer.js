import { Box, Container } from '@chakra-ui/react'

export default function Footer() {
    return (
        <Container textAlign="center">
            <Box as="footer" mb={2} p={3} bgColor="#fafafa" textAlign="center">
                Made by <a className="font-bold" href="https://mino.pink/">Minota</a>!
            </Box>
        </Container>
    )
}