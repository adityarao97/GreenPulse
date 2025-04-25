CREATE TABLE `session` (
                           `id` bigint NOT NULL AUTO_INCREMENT,
                           `user_id` bigint DEFAULT NULL,
                           `jwt_token` varchar(255) DEFAULT NULL,
                           `refresh_token` varchar(255) DEFAULT NULL,
                           `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                           `modified_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                           `expires_at` timestamp NOT NULL,
                           PRIMARY KEY (`id`),
                           KEY `fk_session_user` (`user_id`)
);

CREATE TABLE `user` (
                        `id` bigint NOT NULL AUTO_INCREMENT,
                        `name` varchar(255) NOT NULL,
                        `email` varchar(255) NOT NULL,
                        `password` varchar(255) NOT NULL,
                        `user_type_id` bigint DEFAULT NULL,
                        `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                        `modified_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                        `last_login` timestamp NULL DEFAULT NULL,
                        `is_active` tinyint(1) NOT NULL,
                        `profile_image` varchar(255) DEFAULT NULL,
                        `reset_password_token` varchar(255) DEFAULT NULL,
                        `reset_password_expires` timestamp NULL DEFAULT NULL,
                        `user_type` varchar(255) DEFAULT NULL,
                        PRIMARY KEY (`id`),
                        UNIQUE KEY `email` (`email`),
                        UNIQUE KEY `unique_email_password` (`email`,`password`),
                        KEY `fk_user_userType` (`user_type_id`),
                        CONSTRAINT `fk_user_userType` FOREIGN KEY (`user_type_id`) REFERENCES `user_type` (`id`)
);

CREATE TABLE `user_type` (
                             `id` bigint NOT NULL AUTO_INCREMENT,
                             `created_date` datetime(6) DEFAULT NULL,
                             `is_active` bit(1) DEFAULT NULL,
                             `modified_date` datetime(6) DEFAULT NULL,
                             `name` varchar(255) DEFAULT NULL,
                             PRIMARY KEY (`id`)
);