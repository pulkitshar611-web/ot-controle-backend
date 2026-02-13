-- Alter table to support UUIDs if needed or ensure types are correct
-- Since the frontend is sending UUIDs (strings) for IDs, but the original schema used INT AUTO_INCREMENT,
-- we have a mismatch. 
-- The best quick fix is to recreate tables with VARCHAR IDs OR modify backend to ignore frontend IDs and return new DB IDs.
-- However, maintaining frontend IDs is easier for React state sync.
-- Let's change IDs to VARCHAR(36) to support UUIDs.

SET FOREIGN_KEY_CHECKS = 0;

ALTER TABLE users MODIFY id VARCHAR(36);
ALTER TABLE clients MODIFY id VARCHAR(36);
ALTER TABLE orders MODIFY id VARCHAR(36);
ALTER TABLE orders MODIFY client_id VARCHAR(36);
ALTER TABLE appointments MODIFY id VARCHAR(36);
ALTER TABLE appointments MODIFY client_id VARCHAR(36);
ALTER TABLE chat_sessions MODIFY id VARCHAR(36);
ALTER TABLE chat_sessions MODIFY user_id VARCHAR(36);
ALTER TABLE chat_messages MODIFY id VARCHAR(36);
ALTER TABLE chat_messages MODIFY session_id VARCHAR(36);

SET FOREIGN_KEY_CHECKS = 1;
