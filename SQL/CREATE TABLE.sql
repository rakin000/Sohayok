-- Create user table
CREATE TABLE public.app_user
(
    user_id serial NOT NULL,
    username character varying(100) NOT NULL,
    password character varying(1024) NOT NULL,
    PRIMARY KEY (user_id)
);