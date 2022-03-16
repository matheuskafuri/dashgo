import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

type CreateUserFormData = {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

const createUserFormSchema = yup.object({
    name: yup.string().required('Nome obrigatório'),
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),
    passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Senhas não conferem'),
});

export default function CreateUser() {
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(createUserFormSchema)
    });

    const { errors } = formState;

    const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log(values);

    }

    return (
        <Box>
            <Header />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />
 
                <Box as="form" flex="1" borderRadius={8} bg="gray.800" p={["6", "8"]}  onSubmit={handleSubmit(handleCreateUser)}>
                    <Heading as="h2" size="lg" fontWeight="normal">Criar novo usuário</Heading>

                    <Divider my="6" borderColor="gray.700" />

                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%" >
                            <Input
                                name="name"
                                type="name"
                                label="Nome Completo"
                                error={errors.name}
                                {...register('name')}
                            />
                            <Input
                                name="email"
                                type="email"
                                label="E-mail"
                                error={errors.email}
                                {...register('email')}
                            />
                        </SimpleGrid>

                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%" >
                            <Input
                                name="password"
                                type="password"
                                label="Senha" 
                                error={errors.password}
                                {...register('password')}
                            />
                            <Input
                                name="password_confirmation"
                                type="password"
                                label="Confirmação da senha" 
                                error={errors.passwordConfirmation}
                                {...register('password_confirmation')}
                            />
                        </SimpleGrid>
                    </VStack>

                    <Flex mt="8" justify="flex-end" >
                        <HStack spacing="4">
                            <Link href="/users" passHref>
                                <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
                            </Link>
                            <Button type="submit" isLoading={formState.isSubmitting} colorScheme="pink">Salvar</Button>
                        </HStack>

                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
}