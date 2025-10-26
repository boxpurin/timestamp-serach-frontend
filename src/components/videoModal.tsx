import * as React from "react";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import YouTube from "react-youtube";

interface VideoModalProps {
    isOpen: boolean;
    videoId?: string;
    elapsed: number;
    onClose: () => void;
}

const VideoModal = (props: VideoModalProps) => {
    const playerRef = React.useRef<YouTube>(null);

    // プレーヤーを破棄してから閉じる
    const handleClose = React.useCallback(() => {
        if (playerRef.current) {
            try {
                const player = playerRef.current.getInternalPlayer();
                if (player && typeof player.destroy === 'function') {
                    player.destroy();
                }
            } catch (e) {
                // エラーを無視（すでに破棄されている場合）
            }
        }
        // 少し遅延させてから閉じる
        setTimeout(() => {
            props.onClose();
        }, 0);
    }, [props.onClose]);

    return (
        <Modal open={props.isOpen} closeAfterTransition>
            <Fade in={props.isOpen} timeout={1500}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "30%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        outline: "none",
                    }}>
                    <IconButton
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: "white",
                            zIndex: 1,
                        }} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                    {
                        props.videoId ?
                            <YouTube
                                ref={playerRef}
                                iframeClassName={"youtube-modal-iframe"}
                                videoId={props.videoId}
                                opts={
                                    {
                                        playerVars: {
                                            // https://developers.google.com/youtube/player_parameters
                                            autoplay: 0,
                                            controls: 0,
                                            start: props.elapsed
                                        }
                                    }
                                }
                            />
                            : null
                    }</Box>
            </Fade >
        </Modal>
    );
};

export const useVideoModal = (defaultVideoId?: string): [() => React.ReactNode, React.Dispatch<React.SetStateAction<{ videoId: string | undefined, elapsed: number }>>, () => void, () => void, boolean] => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [timestamp, setTimeStamp] = React.useState({ videoId: defaultVideoId, elapsed: 0 });

    const closeModal = React.useCallback(() => {
        setIsOpen(false);
    }, []);

    const openModal = React.useCallback(() => {
        setIsOpen(true);
    }, []);

    const ModalWindow = () => {
        return (
            <div>
                <VideoModal
                    isOpen={isOpen}
                    videoId={timestamp.videoId}
                    onClose={() => closeModal()}
                    elapsed={timestamp.elapsed}
                />
            </div>
        );
    };

    return [ModalWindow, setTimeStamp, openModal, closeModal, isOpen];
};