-- Create user table
CREATE TABLE public.app_user
(
    user_id serial NOT NULL,
    username character varying(100) NOT NULL,
    password character varying(1024) NOT NULL,
    PRIMARY KEY (user_id)
);


CREATE TABLE public.custom_job
(
    custom_job_id serial NOT NULL,
    title character varying(1024) NOT NULL,
    description character varying(5024) NOT NULL,
    category integer  NOT NULL,
    initial_amount integer NOT NULL,
    poster_id integer NOT NULL,
    CONSTRAINT "Custom_job_pl" PRIMARY KEY (custom_job_id),
    CONSTRAINT custom_job_user_fk FOREIGN KEY (poster_id)
        REFERENCES public.app_user (user_id) MATCH SIMPLE
        ON UPDATE SET NULL
        ON DELETE SET NULL
        NOT VALID
);


CREATE TABLE public.bid
(
    bid_id serial NOT NULL,
    user_id integer NOT NULL,
    provider_id integer NOT NULL,
    user_bid integer,
    provider_bid integer,
    final boolean DEFAULT false,
    CONSTRAINT bid_pk PRIMARY KEY (bid_id),
    CONSTRAINT bid_provider_fk FOREIGN KEY (provider_id)
        REFERENCES public.app_user (user_id) MATCH SIMPLE
        ON UPDATE SET NULL
        ON DELETE SET NULL
        NOT VALID,
    CONSTRAINT bid_user_pk FOREIGN KEY (user_id)
        REFERENCES public.app_user (user_id) MATCH SIMPLE
        ON UPDATE SET NULL
        ON DELETE SET NULL
        NOT VALID
);

ALTER TABLE public.bid
    ADD COLUMN custom_job_id integer;

ALTER TABLE public.bid
    ADD CONSTRAINT bid_custom_job_fk FOREIGN KEY (custom_job_id)
    REFERENCES public.custom_job (custom_job_id) MATCH SIMPLE
    ON UPDATE SET NULL
    ON DELETE SET NULL
    NOT VALID;

CREATE TABLE public.job_order
(
    job_order_id serial NOT NULL,
    custom_job_id integer,
    provider_id integer,
    price integer,
    status integer DEFAULT 0,
    CONSTRAINT job_order_pk PRIMARY KEY (job_order_id),
    CONSTRAINT job_order_custom_job_fk FOREIGN KEY (custom_job_id)
        REFERENCES public.custom_job (custom_job_id) MATCH SIMPLE
        ON UPDATE SET NULL
        ON DELETE SET NULL
        NOT VALID,
    CONSTRAINT job_order_provider_fk FOREIGN KEY (provider_id)
        REFERENCES public.app_user (user_id) MATCH SIMPLE
        ON UPDATE SET NULL
        ON DELETE SET NULL
        NOT VALID
);

ALTER TABLE public.custom_job
    ADD COLUMN final boolean DEFAULT false;